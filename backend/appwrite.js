import { Client, Account, ID, Avatars, Databases, Query,Storage,Messaging } from 'react-native-appwrite';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export const config = {
    databaseId: '67180a61000abb6a14bb',
    helpersCollectionId: '678a56160032d501c613',
    usersCollectionId: '67180d1900112213b749',
    medicalRecordCollectionId: '67799ebf000b7985bdab',
    storageId: '67180e9c0000273d2e0a',
    avatarsId: '6777ff57001825f1819c'
}
 export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6718072f0001b44c740b')
    .setPlatform('com.MedicalApp.app')

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
export const databases = new Databases(client);
const messaging = new Messaging(client);
// Register user
export async function register(email, password, name, surname, firstname, gender, birthdate, phone) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name,
      phone,
    );

     if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(firstname);

    await signIn(email, password);
    let newUser;
     newUser = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        id: newAccount.$id,
        name: name,
        surname: surname,
        firstname: firstname,
        gender: gender,
        birthdate: birthdate,
        phone: phone,
        email: email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Send OTP 
export async function sendMessage(phone){
    const message = await messaging.createSms(
        '[MESSAGE_ID]',    // messageId
        '[CONTENT]',       // content
        [],                // topics (optional)
        [],                // users (optional)
        [],                // targets (optional)
        false,             // draft (optional)
        ''                 // scheduledAt (optional)
    );
}
// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Modify user Info
export async function modifyAccount(params, collectionId) {
  if (params.avatar !== "") {
      const fileUrl = await uploadFile(params.avatar, "image");
      params.avatar = fileUrl;
      
    }else{
      delete params.avatar;
    }
    
    for (const key in params) {
      const value = params[key];
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0) || // Empty array
        (typeof value === "object" && value !== null && Object.keys(value).length === 0) // Empty object
      ) {
        delete params[key];
      }
  }

  try {
    const result = await databases.updateDocument(
      config.databaseId, 
      config.usersCollectionId, 
      collectionId, 
      params,
    );

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.usersCollectionId,
      [Query.equal("id", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(fileUri, type) {
  if (!fileUri) return;

  async function convertFileToBlob(fileUri) {
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  
    // Convert Base64 to Blob using fetch()
    const blob = await fetch(`data:image/jpeg;base64,${base64}`).then(res => res.blob());
    return blob;
  }

  const fileBlob = await convertFileToBlob(fileUri);
  console.log(fileBlob);

  try {
    const y = await storage.createFile(
      config.storageId,
      ID.unique(),
      fileBlob
    )
    console.log(y)
    return y;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
   if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}
// Modify Medical Record
export async function modifyMedicalRecord(params, documentId) {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    for (const key in params) {
      const value = params[key];
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        value === 0 ||
        (Array.isArray(value) && value.length === 0) || // Empty array
        (typeof value === "object" && value !== null && Object.keys(value).length === 0) // Empty object
      ) {
        delete params[key];
      }
  }

  var result;
  if(documentId){
     result = await databases.updateDocument(
      config.databaseId,
      config.medicalRecordCollectionId,
      documentId, // document ID
      params, // data
  );
  }else{
    result = await databases.createDocument(
      config.databaseId,
      config.medicalRecordCollectionId,
      ID.unique(), // document ID
      params, // data
  );
  }

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

// Alert
export async function triggerAlert(action,userDocumentID) {
  try {

    result = await databases.updateDocument(
      config.databaseId,
      config.usersCollectionId,
      userDocumentID, // document ID
      {isAlerting: !action}, // data
    )
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Active Helpers
export async function getActiveHelpers() {
  try {
    const helpers = await databases.listDocuments(
      config.databaseId,
      config.helpersCollectionId,
      [Query.equal("is_working", true)]
    );
    return helpers.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Helpers and Hospitals
export async function getHelpersHospitals() {
  try {
    const helpers = await databases.listDocuments(
      config.databaseId,
      config.helpersCollectionId,
      [Query.equal("is_working", true)]
    );
    return helpers.documents;
  } catch (error) {
    throw new Error(error);
  }
}