import {Link} from 'react-router-dom'

export const CourseCard = ({ course }) => {
    return (
        // <div className="card card-compact bg-base-100 w-96 shadow-xl">
        //     <figure>
        //         <img src={course?.image} alt="course" />
        //     </figure>
        //     <div className="card-body">
        //         <h2 className="card-title">{course?.title} </h2>
        //         <p>{course?.price} </p>
        //         <div className="card-actions justify-end">
        //             <Link to={`/course-details/${course?._id}`}>
        //                 <button className="btn btn-primary">More Details</button>
        //             </Link>
        //         </div>
        //     </div>
        // </div>
        <div className="card card-compact bg-base-100 w-96 shadow-xl hover:shadow-2xl transition-all rounded-lg p-4 m-4 border border-gray-200">
    <figure className="overflow-hidden rounded-lg">
        <img className="transform hover:scale-105 transition-all " src={course?.image} alt="course" />
    </figure>
    <div className="card-body p-6">
        <h2 className="card-title text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">{course?.title}</h2>
        <p>{course?.description}</p>
        <p className="text-lg text-gray-700 mt-2">₹{course?.price}</p>
        <div className="card-actions justify-end mt-4">
            <Link to={`/course-details/${course?._id}`}>
           

                <button className="btn btn-primary px-6 py-2 text-lg font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-all">More Details</button>
            </Link>
        </div>
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