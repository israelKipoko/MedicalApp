import { Client, Account, ID, Avatars, Databases, Query,Storage,Messaging } from 'react-native-appwrite';

export const config = {
    databaseId: '67180a61000abb6a14bb',
    usersCollectionId: '67180d1900112213b749',
    storageId: '67180e9c0000273d2e0a',
}
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6718072f0001b44c740b')
    .setPlatform('com.MedicalApp.app')

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
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

    // if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(name);

    // await signIn(email, password);
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
    const session = await account.createEmailSession(email, password);

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

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
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
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
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

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}