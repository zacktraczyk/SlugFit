import { ProfileType } from '../../types';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabaseClient';
import { CONSUMABLE_WORKOUTS_TABLE_NAME } from './consumableworkouts';

export const PROFILES_TABLE_NAME = 'profiles';

/**
 * Fetch Every User's Username & ID
 * @returns
 */

export const getAllUserNames = async (): Promise<ProfileType[]> => {
  const { data, error, status } = await supabase
    .from(PROFILES_TABLE_NAME)
    .select('username, id')
    .not('full_name', 'is', null)
    .order('username', { ascending: true });

  if (error && status !== 406) throw error;

  return data as ProfileType[];
};

/**
 * Fetch User's Profile Data
 * @param session
 * @returns
 */

export const getUserProfile = async (userId: string | undefined): Promise<ProfileType> => {
  if (userId === undefined) return {};
  const { data, error, status } = await supabase
    .from(PROFILES_TABLE_NAME)
    .select(`id, username, full_name, avatar_url, website, bodyweight, friends`)
    .eq('id', userId)
    .single();
  if (error && status !== 406) throw error;

  return data as ProfileType;
};

export const getFriendsPosts = async (userId: string | undefined, limit: number) => {
  if (userId === undefined) return [];

  const { friends } = await getUserProfile(userId);

  if (friends === undefined) throw new Error('Friends undefined');

  const { data, error } = await supabase
    .from(CONSUMABLE_WORKOUTS_TABLE_NAME)
    .select('*')
    .in('created_by', friends)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) throw error;

  return data;
};

/**
 * Update User's Profile Data
 * @param data
 * @param session
 */

export const updateUserProfile = async (data: ProfileType, session: Session | null) => {
  const { username, full_name, website, bodyweight } = data;

  try {
    if (!session || !session.user) {
      throw 'no user session';
    }

    const updates = {
      updated_at: new Date(),
      username,
      full_name,
      website,
      bodyweight,
    };

    const { error } = await supabase
      .from(PROFILES_TABLE_NAME)
      .update(updates)
      .eq('id', session.user.id);
    if (error) throw error;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    alert(message);
    console.log(error);
  }
};

/**
 * Update User's Profile Picture
 * 1. Upload New Picture to Supabase
 * 2. Update User's Avatar_Url
 * @param uri
 * @param session
 */

export const updateProfilePicture = async (uri: string, session: Session | null) => {
  try {
    if (!session || !session.user) {
      throw 'no user session';
    }

    // 1. Upload New Picture to Supabase

    const newAvatarUrl1 = new Date();
    const newAvatarUrl = newAvatarUrl1.toISOString();

    const photo = { uri: uri, type: 'image/${ext}', name: '' };
    const data = new FormData();
    data.append('file', photo as unknown as File);

    const { error } = await supabase.storage
      .from('avatars')
      .upload(session?.user.id + '/' + newAvatarUrl, data);

    if (error) throw error;

    // 2. Update User's Avatar_Url

    updateAvatarUrl(newAvatarUrl, session);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    alert(message);
    console.log(error);
  }
};

/**
 * Delete User's Current Profile Picture from Supabase
 * @param session
 */

export const deleteProfilePicture = async (session: Session | null) => {
  try {
    if (!session || !session.user) {
      throw 'no user session';
    }

    const { data: list, error } = await supabase.storage
      .from('avatars')
      .list(session?.user.id + '/');

    const filesToRemove = list?.map((x) => session?.user.id + '/' + x.name);

    if (filesToRemove) {
      if (filesToRemove.length != 0) {
        const { error } = await supabase.storage.from('avatars').remove(filesToRemove);
        if (error) throw error;
      }
    }

    if (error) throw error;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    alert(message);
    console.log(error);
  }
};

/**
 * Update User's Avatar_Url
 * @param newAvatarUrl
 * @param session
 */

export const updateAvatarUrl = async (
  newAvatarUrl: string | undefined,
  session: Session | null
) => {
  try {
    if (!session || !session.user) {
      throw 'no user session';
    }

    const updated_at = new Date();

    const { error } = await supabase
      .from(PROFILES_TABLE_NAME)
      .update({ updated_at: updated_at, avatar_url: newAvatarUrl })
      .eq('id', session.user.id);

    if (error) throw error;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    alert(message);
    console.log(error);
  }
};

export const generateProfilePictureUrl = (
  userId: string | undefined,
  avatar_url: string | undefined
): string | undefined => {
  if (userId === undefined || avatar_url === undefined) return undefined;
  return (
    'https://veorawmuwkuyzbxadxgv.supabase.co/storage/v1/object/public/avatars/' +
    userId +
    '/' +
    avatar_url
  );
};
