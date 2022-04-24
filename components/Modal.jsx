import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from "react"
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from '../firebase'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
    const {data: session} = useSession()
    const [open, setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadPost = async () => {
        if(loading) return;

        setLoading(true);

        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })

        console.log('new doc: ', docRef.id)

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);

            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadUrl,
            })
        })

        setOpen(false);
        setLoading(false);
        setSelectedFile(null);
    }

    const addImageToPost = (e) => {
        e.preventDefault()

        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }
  return (
            // <Transition.Root show={open} as={Fragment}>
            //    <Dialog
            //     as='div'
            //     className='fixed z-10 inset-0 overflow-y-auto'
            //     onClose={setOpen}
            //     >
            //         <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
            //             <Transition.Child
            //             as={Fragment}
            //             enter='ease-out duration-300'
            //             enterFrom='opacity-0'
            //             enterTo='opacity-100'
            //             leave='ease-in duration-300'
            //             leaveFrom='opacity-100'
            //             leaveTo='opacity-0'
            //             >
            //                 <Dialog.Overlay
            //                 className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            //                 />
            //             </Transition.Child>
            //             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden='true'>
            //                 &#8203;
            //             </span>

            //             <Transition.Child
            //             as={Fragment}
            //             enter='ease-out duration-300'
            //             enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            //             enterTo='opacity-100 translate-y-0 sm:scale-100'
            //             leave='ease-in duration-300'
            //             leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            //             leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            //             >
                            // <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            // <div>
                            //         <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                            //         onClick={() => filePickerRef.current.click()}
                            //         >
                            //             <CameraIcon
                            //             aria-hidden='true'
                            //             className="h-6 w-6 text-red-600"
                            //             />
                            //         </div>
                            //         <div>
                            //             <div className="mt-3 text-center sm:mt-5">
                            //                 <Dialog.Title
                            //                 as='h3'
                            //                 className='text-lg leading-6 font-medium text-gray-500'
                            //                 >
                            //                     Upload a Photo
                            //                 </Dialog.Title>
                            //             </div>

                            //             <div>
                            //                 <input 
                            //                 type="file" 
                            //                 hidden
                            //                 ref={filePickerRef}
                            //                 onChange={addImageToPost}
                            //                 />
                            //             </div>

                            //             <div className="mt-2">
                            //                 <input 
                            //                 type="text" 
                            //                 className="border-none focus:ring-0 w-full text-center"
                            //                 placeholder="Please enter a caption..."
                            //                 ref={captionRef}
                            //                 />
                            //             </div>

                            //         </div>

                            //         <div className="mt-5 sm:mt-6">
                            //             <button
                            //             type="button"
                            //             // disabled={!selectedFile}
                            //             // onClick={uploadPost} 
                            //             className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                            //             >
                            //                 Upload Post
                            //             </button>
                            //         </div>
                            //     </div>
                            // </div>
            //             </Transition.Child>
            //         </div>
            //     </Dialog>
            // </Transition.Root>

            <>
        {open && (
            <>
            
                <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-10 outline-none focus:outline-none"
            >
                <div className="inline-block align-bottom bg-white rounded-lg px-2 pt-5  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                    onClick={() => filePickerRef.current.click()}
                    >
                        <CameraIcon
                        aria-hidden='true'
                        className="h-6 w-6 text-red-600"
                        />
                    </div> */}
                    {/*body*/}
                    <div>
                                   {selectedFile ? (
                                       <img 
                                       className="w-full object-contain cursor-pointer"
                                       src={selectedFile} onClick={() => setSelectedFile(null)} alt="" />
                                   ) : (
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                                    onClick={() => filePickerRef.current.click()}
                                    >
                                        <CameraIcon
                                        aria-hidden='true'
                                        className="h-6 w-6 text-red-600"
                                        />
                                    </div>
                                   )}
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <h3
                                            className='text-lg leading-6 font-medium text-gray-500'
                                            >
                                                Upload a Photo
                                            </h3>
                                        </div>

                                        <div>
                                            <input 
                                            type="file" 
                                            hidden
                                            ref={filePickerRef}
                                            onChange={addImageToPost}
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <input 
                                            type="text" 
                                            className="border-none focus:ring-0 w-full text-center"
                                            placeholder="Please enter a caption..."
                                            ref={captionRef}
                                            />
                                        </div>

                                    </div>

                                    <div className="mt-5 sm:mt-6">
                                        <button
                                        type="button"
                                        disabled={!selectedFile}
                                        onClick={uploadPost} 
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                                        >
                                            {loading ? "Uploading" : "Upload Post"}
                                        </button>
                                    </div>
                                </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end pt-3 border-t border-solid border-slate-200 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 bg-gray-200 hover:bg-gray-300 rounded-md py-1"
                        type="button"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </button>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <div onClick={() => setOpen(false)} className="opacity-25 fixed inset-0 z-5 bg-black"></div>
      </>
    )}
    </>
  )
}

export default Modal