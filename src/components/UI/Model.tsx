import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { memo, ReactNode } from 'react';

interface IProps {
    isOpen: boolean,
    closeModel: () => void,
    title?: string,
    children: ReactNode,
}
const Model = ({ isOpen, closeModel, title, children }: IProps) => {

    return (
        <>
            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={closeModel}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]">
                                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl">
                                    {title && <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                                        {title}
                                    </DialogTitle>}
                                    <div className="mt-4 flex flex-col">
                                        {children}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default memo(Model);