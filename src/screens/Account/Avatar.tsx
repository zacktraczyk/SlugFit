import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../../utils/supabaseClient";

interface AvatarProps {
  url: null | string;
  size: number;
  onUpload: Function;
}

const Avatar: React.FC<AvatarProps> = ({ url, size, onUpload }) => {
  const [avatarUrl, setAvatarUrl] = useState<null | string>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log("Error downloading image: ", message);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      onUpload(filePath);
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      alert(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View>
      <img
        src={avatarUrl ? avatarUrl : `https://place-hold.it/${size}x${size}`}
        alt={avatarUrl ? "Avatar" : "No image"}
        className="avatar image"
        style={{ height: size, width: size }}
      />
      {uploading ? (
        "Uploading..."
      ) : (
        <View>
          <Text>Upload an avatar</Text>
          <View>
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Avatar;
