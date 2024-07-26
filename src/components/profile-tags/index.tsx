import webflowIcon from '../../assets/webflow.svg';

export default function ProfileTags() {
    return <ul className="md:text-lg text-sm flex lg:items-center lg:flex-row flex-col  lg:space-x-6 lg:space-y-0 space-y-2 space-x-0 text-gray-700">
        <li>@kingjack</li>
        <li className="flex items-center">
            <span className="text-gray-400 sm:block hidden">
                &bull;
                &nbsp;
            </span>
            <span className="flex justify-center space-x-2">
                <span>
                    Senior Product Designer at Webflow
                </span>
                 <img src={webflowIcon} alt="" />
            </span>
            <span className="text-gray-400 sm:block hidden">
                &nbsp;
                &bull;
            </span>
        </li>
        <li>He/Him</li>
    </ul>
}