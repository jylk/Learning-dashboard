import {Link} from 'react-router-dom'

export const CourseCard = ({ course }) => {
    return (
        <div className="card card-compact bg-base-100 h-96 w-96 shadow-xl hover:shadow-2xl transition-all rounded-lg p-0 m-4 ">
            <figure className="overflow-hidden rounded-lg h-1/2">
                <img className=" w-full h-80 transform hover:scale-105 transition-all " src={course?.image} alt="course" />
            </figure>
            <div className="card-body p-0 h-1/2">
                <h2 className="card-title text-xl font-semibold text-black hover:text-blue-600 transition-colors">
                    {course?.title}
                </h2>

                {/* Ensure text breaks into the next line instead of truncating */}
                <p className="text-sm text-black max-h-24 overflow-auto break-words">
                    {course?.description}
                </p>

                <p className="text-lg text-black mt-2">₹{course?.price}</p>
              
                    <Link to={`/admin/course-details/${course?._id}`}>
                        <button className="btn btn-primary px-6 py-2 text-lg font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-all">
                            More Detail 
                        </button>
                    </Link>
                
            </div>
        </div>
    );
};

export const CartCards = ({ item, handleRemove }) => {


    return (
        <div className="flex w-full h-32 items-center gap-20 bg-base-300 mb-10 rounded-md ">
            <img src={item?.courseId?.image} alt="cart-item" className="w-24 h-20" />

            <div>
                <h2>{item?.courseId?.title} </h2>
                <h3>{item?.courseId?.price} </h3>
            </div>

            <button className="btn btn-secondary" onClick={()=>handleRemove(item?._id)}>Remove</button>
        </div>
    );
};