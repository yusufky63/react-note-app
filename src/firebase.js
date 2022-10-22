import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import { setNotes, setNotesArchive } from "./redux/notes/notesSlice";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
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
import { login as LoginRedux, logout as LogoutRedux } from "./redux/auth";

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
    window.location.href = "/";
    return user;
  } catch (error) {
    toast.error(error);
  }
};

//LOGIN
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Giriş Başarılı", user.email);

    window.location.href = "/";
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

//LOGOUT
export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Çıkış Başarılı");
    return true;
  } catch (error) {
    toast.error(error.message);
    window.location.href = "/";
  }
};

export const resetMail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Şifre Sıfırlama Maili Gönderildi");
    return true;
  } catch (error) {
    toast.error("Lütfen Geçerli bir Mail Adresi Giriniz !", error.message);
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
      console.log(result);
      store.dispatch(LoginRedux(result));
      toast.success("Google İle Giriş Yapıldı");
      window.location.href = "/";
      // ...
    })
    .catch((error) => {
      toast.error("Google ile giriş yapılamadı!", error.message);
    });
};

//GITHUB AUTH

// const providerGithub = new GoogleAuthProvider();

// export const githubLogin = async () => {
//  await signInWithPopup(providerGithub)

//   .then(function(result) {

//      var user = result.user;
//      console.log(user);
//       store.dispatch(LoginRedux(user));

//       toast.success("Github İle Giriş Yapıldı");
//       window.location.href = "/";
//   }).catch(function(error) {
//     toast.error("Github ile giriş yapılamadı!", error.message);
//   });

// };

//ADD NOTE
export const addNote = async (note) => {
  try {
    const result = await addDoc(collection(db, "notes"), note);
  
    return result.id;
  } catch (error) {
    toast.error(error.message);
  }

  await addDoc(collection(db, "notes"), note);
};

//DELETE NOTE
export const deleteNote = async (id) => {
  try {
    await deleteDoc(doc(db, "notes", id));
  } catch (error) {
    console.log(error.message);
    toast.error(
      error.message === "Missing or insufficient permissions."
        ? "İşlem İçin Yetkiniz Yok (Başka Bir Kullanıcı Tarafından Eklendi !"
        : error.message
    );
  }
};

//UPDATE NOTE
export const updateNote = async (id, data) => {
  try {
    const updateRef = await updateDoc(doc(db, "notes", id), data);
    toast.success("Görev Güncellendi");
    return updateRef;
  } catch (error) {
    toast.error(
      error.message === "Missing or insufficient permissions."
        ? "İşlem İçin Yetkiniz Yok (Başka Bir Kullanıcı Tarafından Eklendi !"
        : error.message
    );
  }
};

//ARCHIVE NOTE
export const addArchiveNotes = async (note) => {
  try {
    const result = await addDoc(collection(db, "archive"), note);
    deleteNote(note.id);
    toast.success("Not Arşive Eklendi");
    return result.id;
  } catch (error) {
    toast.error(error.message);
  }
  await addDoc(collection(db, "archive"), note);
};

//ARCHIVE NOTE DELETE
export const deleteArchiveNotes = async (id) => {
  try {
    await deleteDoc(doc(db, "archive", id));
 
  } catch (error) {
    console.log(error.message);
    toast.error(
      error.message === "Missing or insufficient permissions."
        ? "İşlem İçin Yetkiniz Yok (Başka Bir Kullanıcı Tarafından Eklendi !"
        : error.message
    );
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
    toast.error(error.message);
  }

  await addDoc(collection(db, "notes"), note);
};
