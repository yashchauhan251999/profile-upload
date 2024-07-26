// import avatar from '../../assets/avatar.png';
import cover from '../../assets/cover.png';
import UpdatePicture from '../update-picture';
import ProfileTags from '../profile-tags';
import { useProfile } from '../../context/profileContext';


export default function Landing() {

    const { profile } = useProfile();

    return (
        <form onSubmit={e => e.preventDefault()} className="flex justify-center items-center h-full">
            <section className="md:w-3/5 w-4/5 border shadow-md rounded-lg overflow-hidden relative">
                <img className="md:h-auto h-40 " src={cover} alt="" />
                <div className="rounded-full overflow-hidden 
                 md:h-40 md:w-40 sm:h-32 sm:w-32 
                h-28 w-28
                absolute flex justify-center items-center
                md:translate-x-[2rem] translate-x-[1rem] 
                md:translate-y-[-77px] translate-y-[-60px]
                ">
                    <img src={profile} alt="" />
                </div>

                <div className="min-h-48 bg-white pt-4 md:px-8 px-4 pb-14">
                    <div className="flex flex-col space-y-6">
                        <UpdatePicture />
                        <h1 className="md:text-3xl text-2xl font-semibold">Jack Smith</h1>
                        <ProfileTags />
                    </div>
                </div>
            </section>
        </form>
    )
}