import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PinDetails, PinFormInput, UpdatePinInput } from "@/types/pin.types";
import {
  createPin,
  deletePin,
  getPinDetails,
  updatePin,
} from "@/services/pin.services";
import { ErrorResponse } from "@/types/errors.types";
import toast from "react-hot-toast";

export const usePinAction = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  const handleCreatePin = async (formValue: PinFormInput) => {
    const { title, description, link, image_url } = formValue;

    const pinToCreate: PinFormInput = {
      title,
      description,
      link,
      image_url,
    };

    setMessage("");
    setLoading(true);
    setSuccessful(true);

    try {
      await createPin(pinToCreate);
      navigate("/");
    } catch (error) {
      handlePinError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePin = async (id: string, formValue: PinFormInput) => {
    const { title, description, link, image_url } = formValue;

    const pinToUpdate: UpdatePinInput = {
      title,
      description,
      link,
      image_url,
    };

    setMessage("");
    setLoading(true);
    setSuccessful(true);

    try {
      await updatePin(id, pinToUpdate);
      navigate(`/pins/${id}`);
      console.log("Pin updated successfully");
    } catch (error) {
      handlePinError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePin = async (id: string) => {
    setMessage("");
    setSuccessful(true);
    try {
      await deletePin(id);
      toast.success("Pin deleted successfully");
      // TODO: where to navigate after deleting a pin?
      navigate("/pin/create");
    } catch (error) {
      handlePinError(error as ErrorResponse);
      toast.error("Failed to delete the pin");
    }
  };

  const handlePinError = (error: ErrorResponse) => {
    if (error.response && error.response.status === 401) {
      toast.error("Sorry, You're not authenticated.");
      setMessage("Sorry, You're not authenticated.");
    } else {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
    setSuccessful(false);
  };

  return {
    successful,
    message,
    loading,
    handleCreatePin,
    handleUpdatePin,
    handleDeletePin,
  };
};

export const usePinDetails = (id: string) => {
  const [pinDetails, setPinDetails] = useState<PinDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pinDetailsData = await getPinDetails(id);
        setPinDetails(pinDetailsData);
      } catch (error) {
        console.error("Error fetching pin details:", error);
      }
    };

    fetchData();
    return () => {};
  }, [id]);

  return {
    pinDetails,
  };
};
