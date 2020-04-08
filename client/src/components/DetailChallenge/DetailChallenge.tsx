import React, { useEffect, useState, Fragment } from "react";
import { gsap } from "gsap";

import Gap from "../Gap/Gap";
import AddDetail from "../AddDetail/AddDetail";
import { BASE_URL } from "../../base/baseURL";
import SubTitle from "../SubTitle/SubTitle";
import Loading from "../../Loading/Loading";

interface Props {
    match: {
        params: {
            challengeID: string;
        };
    };
    location: {
        state: {
            hashtag: string;
        };
    };
}

interface IDetail {
    parent_id: string;
    tweet: string;
    date_created: number;
}

const DetailChallenge = (props: Props) => {
    const hashtag = props.location.state
        ? props.location.state.hashtag
        : "#100DaysOf";
    const id = props.match.params.challengeID;
    const [detailList, setDetailList] = useState<Array<IDetail>>([]);

    async function getAllDetails(url: string) {
        try {
            const response = await fetch(url).then((res) => res.json());
            setDetailList(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllDetails(`${BASE_URL}/detail/${id}`);
    }, [id]);

    // GSAP ANIMATION
    // useEffect(() => {
    //     gsap.from(".daily", {
    //         opacity: 0,
    //         y: 120,
    //         ease: "back",
    //         stagger: 0.4,
    //         duration: 1.4,
    //     });
    // }, [document.querySelectorAll('.daily')]);

    if (detailList.length === 0) {
        return (
            <div>
                <Gap className='h-10' />
                <Loading />
            </div>
        );
    } else if (detailList[0] === null) {
        return (
            <Fragment>
                <Gap className='h-10' />
                <h2 className='text-center text-pink-600 text-4xl'>
                    Start your first day now!
                </h2>
                <Gap className='h-10' />
                <AddDetail
                    id={id}
                    hashtag={hashtag}
                    getAllDetails={getAllDetails}
                />
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <Gap className='h-5' />
                <SubTitle subtitle='Track your daily progress' emoji='💻' />
                <Gap className='h-5' />
                <AddDetail
                    id={id}
                    hashtag={hashtag}
                    getAllDetails={getAllDetails}
                />
                <Gap className='h-6' />
                <ol className='max-w-md mx-auto bg-teal-300 rounded-lg overflow-hidden'>
                    {detailList.map((detail, i) => {
                        return (
                            <li
                                className='daily px-6 py-4 w-full border-b-2 border-teal-400'
                                key={`${detail.parent_id}-${i}`}>
                                <p className='first-line-bold whitespace-pre-wrap'>
                                    {detail.tweet}
                                </p>
                            </li>
                        );
                    })}
                </ol>
                <Gap className='h-8' />
            </Fragment>
        );
    }
};

export default DetailChallenge;
