import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateProfilePicture } = useAuthStore();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setIsUpdatingProfile(true);
    setError(null);
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      // Subir la imagen
      const uploadRes = await axios.post(
        "http://192.168.100.16:5001/api/usuario/upload", 
        formData, 
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      const imageUrl = uploadRes.data.imageUrl;
      
      // Actualizar el perfil con la nueva imagen
      const updateRes = await axios.put(
        `http://192.168.100.16:5001/api/usuario/upload/ProfilePic/${authUser._id}`,
        { imageUrl }
      );
  
      // Actualizar el store con la nueva URL (incluyendo cache buster)
      if (typeof updateProfilePicture === 'function') {
        const updatedUser = updateRes.data.user;
        await updateProfilePicture(updatedUser.profilePic);
        
        // Forzar recarga de la página para limpiar caché
        window.location.reload();
      } else {
        console.error("updateProfilePicture no es una función");
        setError("No se pudo actualizar la imagen. Intente nuevamente.");
      }
    } catch (err) {
      console.error("Error al subir o actualizar imagen:", err);
      setError(err.response?.data?.message || "Error al subir la imagen");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          
          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
            <img
  src={`${authUser?.profilePic || "/avatar.webp"}?t=${new Date().getTime()}`}
  alt="Profile"
  className="size-32 rounded-full object-cover border-4"
  onError={(e) => {
    e.target.src = "/avatar.webp";
  }}
  key={authUser?.profilePic} // Esto fuerza a React a recrear el componente cuando cambia la URL
/>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={handleImageChange}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile 
                ? "Uploading..." 
                : "Click the camera icon to update your photo"}
            </p>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          {/* User info section */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullName || "N/A"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Número de Control
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.controlNumber || "N/A"}
              </p>
            </div>
          </div>

          {/* Account info section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>
                  {authUser?.createdAt 
                    ? new Date(authUser.createdAt).toLocaleDateString() 
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;