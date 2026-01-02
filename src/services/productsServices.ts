import { db, storage } from "@/config/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadProductImage = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (e) {
    console.error('Error uploading image: ', e);
    throw e;
  }
}

export const getProducts = async () => {
  try {
    const itemCollectionRef = collection(db, 'products');
    const querySnapshot = await getDocs(itemCollectionRef);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (e) {
    console.error('Error getting products: ', e);
    throw e;
  }
}

export const addProduct = async (productData: any, imageFile?: File) => {
  try {
    const itemCollectionRef = collection(db, 'products');
    const productDoc = doc(itemCollectionRef);
    const productId = productDoc.id;
    
    let imageUrl = productData.imageUrl || '';
    
    if (imageFile) {
       imageUrl = await uploadProductImage(imageFile, `products/${productId}`);
    }
    
    await setDoc(productDoc, {
      ...productData,
      imageUrl,
      createdAt: new Date().toISOString()
    });
    
    return productId;
  } catch (e) {
    console.error('Error adding product: ', e);
    throw e;
  }
}