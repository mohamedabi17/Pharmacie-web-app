"use client"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState,useEffect } from "react";
import { SignUp } from "@clerk/nextjs";
import axios from "axios";
// import { redirect } from "next/navigation";
// import { Redirect } from "next";
import { useRouter } from "next/navigation";
 function Sign() {
   const [formData, setFormData] = useState({
    profile: {
      username: "",
      password: "", 
      confirmPassword: "", // Add confirmPassword field
      about: "",
      coverPhoto: "",
      secretCode: "", // Added the secretCode field
    },
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      streetAddress: "",
      city: "",
      region: "",
      postalCode: "",

    },
    notifications: {
      email: {
        comments: false,
        candidates: false,
        offers: false,
      },
      pushNotifications: false,
    },
  });

const [passwordsMatchError, setPasswordsMatchError] = useState<string | null>(null);
const [SubmitSuccess, setSubmitSuccess] = useState<boolean | false>(false);
const passwordsMatch = (): boolean => {
  const { password, confirmPassword } = formData.profile;
  return password === confirmPassword;
  
};
const secretCodeIsValid = (): boolean => {
  const { secretCode } = formData.profile;
  const secretCodeFromEnv = process.env.SECRET_CODE;
  console.log( secretCode === secretCodeFromEnv)
  return secretCode === secretCodeFromEnv;

};

const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      personalInfo: {
        ...prevData.personalInfo,
        [name]: value,
      },
    }));
  };

const handleSecretCodeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    profile: {
      ...prevData.profile,
      [name]: value,
    },
  }));
};


const handlepasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    profile: {
      ...prevData.profile,
      [name]: value,
    },
  }));

  if (name === 'password') {
    setFormData((prevData) => ({
      ...prevData,
      confirmPassword: value,
    }));
  }
};

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  // If the input is a file input, read the contents and update the state with the data URL
  if (name === 'photo' || name === 'coverPhoto') {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files && fileInput.files[0];
    
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profile: {
            ...prevData.profile,
            [name]: reader.result as string,
          },
        }));
      };

      reader.readAsDataURL(selectedFile);
    }
  } else {
    // For non-file inputs, update the state with the input value
    setFormData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        [name]: value,
      },
    }));
  }
};


const handleProfileDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  console.log("Name:", name);
  console.log("Value:", value);

  if ( name !== 'coverPhoto') {
    setFormData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,  // Update 'prevData.personalInfo' instead of 'prevData.profile'
        [name]: value,
      },
    }));
  }
};


  const handlePersonalChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  console.log("Name:", name);
  console.log("Value:", value);

  setFormData((prevData) => ({
    ...prevData,
    personalInfo: {
      ...prevData.personalInfo,
      [name]: value,
    },
  }));
};

  const handleNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      notifications: {
        ...prevData.notifications,
        email: {
          ...prevData.notifications.email,
          [name]: checked,
        },
      },
    }));
  };

   const handlePushNotificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      notifications: {
        ...prevData.notifications,
        pushNotifications: checked,
      },
    }));
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  passwordsMatch();

  const secretCodeFromEnv = "dzpharma2024";
  console.log(formData.profile.secretCode)
  console.log(secretCodeFromEnv)
  if (formData.profile.secretCode !== secretCodeFromEnv) {
    console.error('Unauthorized admin account creation');
    // Display an error message to the user
    return;
  }

  try {
    console.log(formData);
    const response = await axios.post('http://localhost:5000/pharmacie/users', formData);
    console.log('Data posted successfully', response.data);
    setSubmitSuccess(true);
    router.push('/login');
  } catch (error) {
    // Handle error, e.g., show an error message
    console.error('Error posting data', error);
    setSubmitSuccess(false);
  }
};


  return ( 
    <form onSubmit={handleSubmit} className="mb-30 min-h-screen mb-20">
      <div className="space-y-12 w-4/5 mx-auto">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="logo_new.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create your account
          </h2>
        </div>
        <div className="border-b border-white pb-12">
          <h2 className="text-base font-semibold leading-7white">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            most of the information will be  private so dont worry
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6white"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    pharma.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1white placeholder:text-grey-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="johndoe"
                    onChange={handleProfileDetailsChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6white"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  onChange={handleProfileDetailsChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="coverPhoto"
                className="block text-sm font-medium leading-6white"
              >
                coverPhoto
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                
                 
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="coverPhoto"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a Profile coverPhoto</span>
                      <input
                        id="coverPhoto"
                        name="coverPhoto"
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
              </div>
            </div>

          <div className="sm:col-span-4">
              <label htmlFor="secretCode" className="block text-sm font-medium leading-6 white">
                Secret Code Only for Admins
              </label>
              <div className="mt-2">
                <div className={`form-control ${secretCodeIsValid()  ? '' : 'input-error'}`}>
                  <label className="label">
                    <span className="label-text">Secret Code</span>
                  </label>
                  <input
                    type="password"
                    name="secretCode"
                    placeholder="Secret Code"
                    className="input input-bordered"
                    value={formData.profile.secretCode}
                    onChange={handleSecretCodeChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6white"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  onChange={handlePersonalChange}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6white"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  onChange={handlePersonalChange}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                   onChange={handlePersonalChange}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          <div className="sm:col-span-4">
            <label htmlFor="password" className="block text-sm font-medium leading-6 white">
            Password
          </label>
          <div className="mt-2">
            <div className={`form-control ${passwordsMatch() ? '' : 'input-error'}`}>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                value={formData.profile.password}
                onChange={handlepasswordChange}
                required
              />
            </div>
          </div>

          <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 white mt-4">
            Confirm Password
          </label>
          <div className="mt-2">
          <div className={`form-control ${passwordsMatch() ? '' : 'input-error'}`}>
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input input-bordered"
                onChange={handlepasswordChange}
                required
              />
            </div>
          </div>

          {!passwordsMatch() && (
            <p className="text-red-500 mt-2">Passwords do not match. Please try again.</p>
          )}
          </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6white"
              >
                Country
              </label>
             <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                onChange={handleSelectChange}
                value={formData.personalInfo.country} 
                className="block w-full rounded-md border-0 py-1.5 white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium leading-6white"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="streetAddress"
                  id="streetAddress"
                  autoComplete="streetAddress"
                  onChange={handlePersonalChange}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6white"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  onChange={handlePersonalChange}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6white"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  onChange={handlePersonalChange}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium leading-6white"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  autoComplete="postalCode"
                  onChange={handlePersonalChange}
                  className="block w-full rounded-md border-0 py-1.5white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7white">
            Notifications
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We will always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6white">
                By Email
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-mediumwhite">
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      onChange={handleNotificationsChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-mediumwhite">
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleNotificationsChange}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-mediumwhite">
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6white">
                Push Notifications
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                     onChange={handlePushNotificationsChange}
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6white"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={handlePushNotificationsChange}
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6white"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6 w-4/5">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
        {SubmitSuccess &&
          <div role="alert" className="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current  h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Your account has been succesfuly create!</span>
          </div>
        }
        
      </div>
    </form>
  );}

  
export default Sign;