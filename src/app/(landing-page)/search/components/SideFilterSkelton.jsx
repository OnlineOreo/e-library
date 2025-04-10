import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const SideFilterSkelton = () => {
    return (
        <div className="max-w-xs shadow-md">
            {/* Publishers */}
            <div className="mb-6 border-bottom px-3 py-2">
                <Skeleton width={100} height={20} />
                <div className="mt-3 my-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between my-2">
                            <div className="d-flex gap-2">
                                <Skeleton circle width={16} height={16} />
                                <Skeleton width={150} height={15} />
                            </div>
                            <Skeleton circle width={16} height={16} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Access Type */}
            <div className="mb-6 border-bottom px-3 py-2">
                <Skeleton width={100} height={20} />
                <div className="mt-3 my-2">
                    {Array.from({ length: 1 }).map((_, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between my-2">
                            <div className="d-flex gap-2">
                                <Skeleton circle width={16} height={16} />
                                <Skeleton width={150} height={15} />
                            </div>
                            <Skeleton circle width={16} height={16} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Resouces Type */}
            <div className="mb-6 border-bottom px-3 py-2">
                <Skeleton width={100} height={20} />
                <div className="mt-3 my-2">
                    {Array.from({ length: 1 }).map((_, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between my-2">
                            <div className="d-flex gap-2">
                                <Skeleton circle width={16} height={16} />
                                <Skeleton width={150} height={15} />
                            </div>
                            <Skeleton circle width={16} height={16} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Authors */}
            <div className="mb-6 border-bottom px-3 py-2">
                <Skeleton width={100} height={20} />
                <div className="mt-3 my-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between my-2">
                            <div className="d-flex gap-2">
                                <Skeleton circle width={16} height={16} />
                                <Skeleton width={150} height={15} />
                            </div>
                            <Skeleton circle width={16} height={16} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Publish Year */}
            <div className="mb-6 border-bottom px-3 py-2">
                <Skeleton width={100} height={20} />
                <div className="mt-3 my-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="d-flex align-items-center justify-content-between my-2">
                            <div className="d-flex gap-2">
                                <Skeleton circle width={16} height={16} />
                                <Skeleton width={150} height={15} />
                            </div>
                            <Skeleton circle width={16} height={16} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideFilterSkelton