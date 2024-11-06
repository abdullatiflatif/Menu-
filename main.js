import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBm9HdJ92vSLrKRclI6Z2J4bmvlFgR4AuU",
  authDomain: "mang-yana.firebaseapp.com",
  projectId: "mang-yana",
  storageBucket: "mang-yana.appspot.com",
  messagingSenderId: "1094982396668",
  appId: "1:1094982396668:web:2d103526ab40a59efc0579",
  measurementId: "G-MF48P7VG5P"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//fungsi untuk menampilkan data
export async function ambilDaftarnabawi() {
  const refDokumen = collection(db, "nabawi");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
    });
  });



  return hasil;
}
//################$#######

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//fungsi untuk menambahkan data
export async function tambahnabawi(nama, harga,) {
  try {
    const dokRef = await addDoc(collection(db, 'nabawi'), {
      nama: nama,
      harga: harga,
    });
    console.log('berhasil menembah nabawi ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah nabawi ' + e);
  }
}
//#####################
//fungsi untuk hapus data
export async function hapusnanawi(docId) {
  await deleteDoc(doc(db, "nabawi", docId));
}
//fungsi untuk ubah data
export async function ubahnabawi(docId, nama, harga,) {
  await updateDoc(doc(db, "nabawi", docId), {
    nama: nama,
    harga: harga,
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilnabawi(docId) {
  const docRef = await doc(db, "nabawi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}