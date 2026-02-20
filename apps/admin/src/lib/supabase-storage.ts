import { supabase } from "@bus2ride/shared/supabase";

export async function uploadImage(file: File, bucket: string = "site-assets") {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (error) {
        // If bucket doesn't exist, we can't easily create it with the public client
        // but we can at least log it and throw.
        throw error;
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return publicUrl;
}
