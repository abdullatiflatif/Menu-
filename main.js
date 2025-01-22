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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdgAITXTldockRB_wgxOrbNUPKzSVBhDs",
  authDomain: "insan-cemerlang-c9554.firebaseapp.com",
  projectId: "insan-cemerlang-c9554",
  storageBucket: "insan-cemerlang-c9554.appspot.com",
  messagingSenderId: "753628555075",
  appId: "1:753628555075:web:7a72b2d1e8ae89716931f6",
  measurementId: "G-KMJZ5V0B8H"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
export async function hapusnabawi(docId) {
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