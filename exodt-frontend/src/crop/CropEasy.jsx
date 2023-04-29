import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { BsCrop } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import getCroppedImg from "./utils/cropImage";
import { useTheme } from "next-themes";

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [cropLoading, setCropLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const { theme } = useTheme();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}`;
  };

  const cropImage = async () => {
    setCropLoading(true);
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setFile(file);
      setOpenCrop(false);
    } catch (error) {
      toast.error(`${error.message}`, {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      console.log(error);
    }

    setCropLoading(false);
  };

  return (
    <div className="fixed z-20 inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div
          className={`${
            theme === "light" ? `bg-white` : `bg-gray-500`
          }  w-full px-6 py-2 rounded-2xl max-w-md space-y-8`}
        >
          <DialogContent
            sx={{
              position: "relative",
              width: "auto",
              height: 400,
              background: "#333",
              minWidth: { sm: 300 },
            }}
          >
            <Cropper
              image={photoURL}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </DialogContent>
          <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
            <Box sx={{ width: "100%", mb: 1 }}>
              <Typography variant="overline">
                Zoom: {zoomPercent(zoom)}
              </Typography>
              <Slider
                valueLableDisplay="auto"
                valueLableFormat={zoomPercent}
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </Box>
            <Box sx={{ width: "100%", mb: 1 }}>
              <Typography>Rotation: {rotation}</Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {cropLoading ? (
                "Loading..."
              ) : (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<MdCancel />}
                    onClick={() => setOpenCrop(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={cropImage}
                    variant="contained"
                    color="primary"
                    startIcon={<BsCrop />}
                  >
                    Crop
                  </Button>
                </>
              )}
            </Box>
          </DialogActions>
        </div>
      </div>
    </div>
  );
};

export default CropEasy;
