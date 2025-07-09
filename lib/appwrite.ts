import { CreateUserParams, GetMenuParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.presh.foodordering",
  databaseId: "686d20fb000adb48c2bd",
  bucketId: "686e4ed600247954adb8",

  userCollectionId: "686d2128002dd0e2bf09",
  categoriesCollectionId: "686e394d003ad6f488d3",
  menuCollectionId: "686e4ba500167e9b5bf7",
  customizationsCollectionId: "686e4cf1002743e7b7de",
  menuCustomizationsCollectionId: "686e4de1000476865f51",
}

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);
//.setSelfSigned() // Use this only for development, not recommended for production

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name)
    if (!newAccount) throw Error;

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl }
    );
  } catch (e) {
    throw new Error(e as string);
  }
}

export const signIn = async ({ email, password }: { email: string; password: string }) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (e) {
    throw new Error(e as string);
  }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (e) {
        console.log(e);
        throw new Error(e as string);
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
  try {
    const queries: string[] = [];

    if (category) {
      queries.push(Query.equal("categories", category));
    }
    if (query) {
      queries.push(Query.search("name", query));
    }

    const menus = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries.length > 0 ? queries : undefined,
    );
    return menus.documents;
  } catch (e) {
    throw new Error(e as string);
  }
}

export const getCategories = async () => {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      //[Query.orderAsc("name")]
    );
    return categories.documents;  
  } catch (e) {
    throw new Error(e as string);
  } 
}