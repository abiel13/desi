import { formI } from "@/app/(tabs)/create";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.abiel.desi",
  projectId: "666d994f000c61234996",
  databaseId: "666d9b5e0034d168bc97",
  userCollectionId: "666d9b7a0031f05b13b1",
  videoCollectionId: "666d9baa003a93438b0d",
  storageId: "666da3d2003548179e8a",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);
// Register User\

export const createAccount = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;

    const avatarurl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        avatar: avatarurl,
        email,
        username,
      }
    );

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email: any, password: any) => {
  try {
    const session = account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLoggedinUser = async () => {
  try {
    const loggedInUser = await account.get();

    if (!loggedInUser) throw Error;

    const user = database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", loggedInUser.$id)]
    );

    if (!user) throw Error;

    return (await user).documents[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPost = async () => {
  try {
    const response = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );
    return response.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLatestPost = async () => {
  try {
    const response = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,

      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return response.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchPost = async (query: unknown) => {
  try {
    const response = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,

      [Query.search("title", query as string)]
    );
    return response.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const searchPostByUserId = async (id: string) => {
  try {
    const response = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,

      [Query.equal("Creator", id)]
    );
    return response.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logoutUser = async () => {
  try {
    const logout = account.deleteSession("current");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId: string, type: string) => {
  let fileUrl;

  try {
    if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    }
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else {
      throw new Error("invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const uploadFiles = async (file: any, type: string) => {
  if (!file) return;

  const { mimeType, ...rest } = file;

  const asset = { type: mimeType, ...rest };
  try {
    const uploadFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const createVideo = async (form: formI) => {
  try {
    const [thumbnail, videoUrl] = await Promise.all([
      uploadFiles(form.thumbnail, "image"),
      uploadFiles(form.video, "video"),
    ]);

    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        thumbnail,
        video: videoUrl,
        title: form.title,
        Creator: form.userId,
      }
    );
  } catch (error) {
    throw new Error(error as string);
  }
};
