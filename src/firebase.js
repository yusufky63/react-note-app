import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { setNotes, setNotesArchive } from "./redux/notes/notesSlice";
import { login as LoginRedux, logout as LogoutRedux } from "./redux/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

import {
  doc,
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { store } from "./redux/store";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

//REGISTER
export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Kayıt Başarılı");
    if (auth.currentUser.email) {
      window.location.href = "/";
      toast.success("Kayıt Başarılı");
    }
    return user;
  } catch (error) {
    errorMessages(error);
  }
};

//LOGIN
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Giriş Başarılı", user.email);
    if (auth.currentUser.email) {
      window.location.href = "/";
    }
    return user;
  } catch (error) {
    errorMessages(error);
  }
};

//LOGOUT
export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Çıkış Başarılı");
    window.location.href = "/";
    return true;
  } catch (error) {
    errorMessages(error);
  }
};
//RESET PASSWORD
export const resetPasword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success(
      "Şifre Sıfırlama Maili Gönderildi (Spam Kutunuzu Kontrol Ediniz)"
    );
    return true;
  } catch (error) {
    errorMessages(error);
    return false;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(LoginRedux(user));
    onSnapshot(
      query(collection(db, "notes"), where("uid", "==", user.uid)),
      (doc) => {
        store.dispatch(
          setNotes(
            doc.docs.reduce(
              (notes, note) => [...notes, { ...note.data(), id: note.id }],
              []
            )
          )
        );
      }
    );
    //ARCHIVE
    onSnapshot(
      query(collection(db, "archive"), where("uid", "==", user.uid)),
      (doc) => {
        store.dispatch(
          setNotesArchive(
            doc.docs.reduce(
              (notes, note) => [...notes, { ...note.data(), id: note.id }],
              []
            )
          )
        );
      }
    );
  } else {
    store.dispatch(LogoutRedux());
    store.dispatch(setNotes([]));
    store.dispatch(setNotesArchive([]));
  }
});

//GOOGLE AUTH
const providerGoogle = new GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: "select_account",
});
export const googleLogin = async () => {
  await signInWithPopup(auth, providerGoogle)
    .then((result) => {
      store.dispatch(LoginRedux(result));
      toast.success("Google İle Giriş Yapıldı");
      console.log(auth.currentUser.email);
      if (auth.currentUser) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      toast.error("Google ile giriş yapılamadı!", error.message);
      errorMessages(error);
    });
};

//GITHUB AUTH
const providerGithub = new GithubAuthProvider();
export const githubLogin = async () => {
  await signInWithPopup(auth, providerGithub)
    .then(function (result) {
      store.dispatch(LoginRedux(result.user));
      toast.success("Github İle Giriş Yapıldı");
      if (auth.currentUser.email) {
        window.location.href = "/";
      }
    })
    .catch(function (error) {
      toast.error("Github ile giriş yapılamadı!", error.message);
      errorMessages(error);
    });
};

//ADD NOTE
export const addNote = async (note) => {
  try {
    const result = await addDoc(collection(db, "notes"), note);
    return result.id;
  } catch (error) {
    errorMessages(error);
  }

  await addDoc(collection(db, "notes"), note);
};

//DELETE NOTE
export const deleteNote = async (id) => {
  try {
    await deleteDoc(doc(db, "notes", id));
  } catch (error) {
    console.log(error.message);
    errorMessages(error);
  }
};

//UPDATE NOTE
export const updateNote = async (id, data) => {
  try {
    const updateRef = await updateDoc(doc(db, "notes", id), data);
    toast.success("Not Güncellendi");
    return updateRef;
  } catch (error) {
    errorMessages(error);
  }
};

//ARCHIVE NOTE
export const addArchiveNotes = async (note) => {
  try {
    const result = await addDoc(collection(db, "archive"), note);
    deleteNote(note.id);
    toast.warning("Not Arşive Eklendi");
    return result.id;
  } catch (error) {
    errorMessages(error);
  }
  await addDoc(collection(db, "archive"), note);
};

//ARCHIVE NOTE DELETE
export const deleteArchiveNotes = async (id) => {
  try {
    await deleteDoc(doc(db, "archive", id));
  } catch (error) {
    errorMessages(error);
  }
};

//ARCHIVE RESTORE NOTE
export const restoreToNotes = async (note) => {
  try {
    console.log(note);
    const result = await addDoc(collection(db, "notes"), note);
    deleteArchiveNotes(note.id);
    toast.success("Not Geri Yüklendi");
    return result.id;
  } catch (error) {
    errorMessages(error);
  }

  await addDoc(collection(db, "notes"), note);
};

//Error Handling
export const errorMessages = (error) => {
  const errorMessageMap = {
    "auth/weak-password": "Şifre en az 6 karakter olmalıdır.",
    "auth/invalid-email": "Geçersiz E-posta",
    "auth/user-not-found": "Kullanıcı Bulunamadı",
    "auth/email-already-in-use": "Bu e-posta adresi zaten kullanımda.",
    "auth/too-many-requests":
      "Çok fazla giriş denemesi. Lütfen daha sonra tekrar deneyin.",
    "auth/requires-recent-login": "Tekrar Giriş Yapın",
    "auth/user-disabled": "Kullanıcı Engellendi",
    "auth/account-exists-with-different-credential":
      "Bu E-posta Adresi Zaten Kullanımda",
    "auth/missing-email": "E-posta Adresi Giriniz",
    "auth/wrong-password": "Şifre Yanlış",
    "auth/user-token-expired":
      "Kullanıcı oturum süresi doldu. Lütfen tekrar giriş yapın.",
    "auth/user-mismatch":
      "Hatalı kullanıcı kimliği. Lütfen tekrar giriş yapın.",
    "auth/invalid-action-code": "Geçersiz veya süresi dolmuş işlem kodu.",
    "auth/operation-not-allowed": "İşlem izin verilmemiş.",
    "auth/invalid-verification-code": "Geçersiz doğrulama kodu.",
    "auth/network-request-failed": "Ağ hatası. Lütfen tekrar deneyin.",
    "auth/provider-already-linked": "Bu kimlik sağlayıcı zaten kullanımda.",
    "auth/provider-not-found": "Kimlik sağlayıcı bulunamadı.",
    "auth/credential-already-in-use": "Bu kimlik zaten kullanımda.",
    "auth/invalid-credential": "Geçersiz kimlik.",
    "auth/invalid-verification-id": "Geçersiz doğrulama kimliği.",
    "auth/invalid-continue-uri": "Geçersiz devam adresi.",
    "auth/unauthorized-continue-uri": "Devam adresine yetkisiz erişim.",
    "Cancelled by user": "İptal edildi.",
    "auth/email-already-exists": "Bu e-posta adresi zaten kullanımda.",
  };

  const errorMessage = errorMessageMap[error.code] || error.message;
  toast.error(errorMessage);
  console.log(error.message);
};
