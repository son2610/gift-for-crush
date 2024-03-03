import { useEffect, useRef, useState } from "react";
import cn from "./utils/cn";
import useSound from "use-sound";
import { AiFillSound } from "react-icons/ai";

function App() {
    const yesRef = useRef();
    const noRef = useRef();
    const infoRef = useRef("");
    const inforHeaderRef = useRef("");
    const [temp, setTemp] = useState(0);
    const [refuse, setRefuse] = useState(false);
    const [isHide, setIsHide] = useState(false);
    const [padding, setPadding] = useState("p");
    const soundUrl = [
        "/sound/mp3-refuse.mp3",
        "/sound/mp3-accept.mp3",
        "/sound/mp3-open.mp3",
    ];
    const [playRefuse] = useSound(soundUrl[0], { interrupt: true });
    const [playAccept] = useSound(soundUrl[1], { interrupt: true });
    const [playOpen, { stop }] = useSound(soundUrl[2], { interrupt: true });
    // const count = useRef(0);
    const ARR_PIC = [
        "1.gif",
        "2.gif",
        "3.gif",
        "4.gif",
        "5.gif",
        "6.gif",
        "7.gif",
        "8.gif",
        "9.gif",
        "10.gif",
        "accepte.gif",
        "refuse.gif",
    ];
    const [countClick, setCountClick] = useState(0);
    useEffect(() => {
        console.log(noRef);
        console.log(yesRef);
    }, []);
    const sayNo = () => {
        setCountClick((prev) => ++prev);
        switch (countClick) {
            case 0:
                setTemp(1);
                setPadding("px-6 py-8");
                break;
            case 1:
                setTemp(2);
                setPadding("px-8 py-10");
                infoRef.current.innerText = "Xin đừng hẹn kiếp sau mà (*-*!)";
                break;
            case 2:
                setTemp(3);
                setPadding("px-10 py-12");
                infoRef.current.innerText =
                    "Kiếp này đã đủ rồi bạn ơi, xin đừng ấn nữa mà";
                break;
            case 3:
                setTemp(4);
                setPadding("px-12 py-14");
                infoRef.current.innerText =
                    "Có vẻ như là... bạn vẫn kiên trì với quyết định này";
                break;
            case 4:
                setTemp(5);
                setPadding("px-14 py-16");
                infoRef.current.innerText = "Một cơ hội cũng không thể ư ...";
                break;
            case 5:
                setTemp(6);
                setPadding("px-16 py-20");
                infoRef.current.innerText =
                    "Vậy là mình không thể thuyết phục bạn nhấn cái nút màu xanh bên cạnh sao.";
                break;
            case 6:
                setTemp(7);
                setPadding("px-20 py-24");
                infoRef.current.innerText = "Con tim ta đau quá man 🥺 ....";
                break;
            case 7:
                setTemp(8);
                setPadding("px-24 py-28");
                infoRef.current.innerText =
                    "Tại sao vậy chứ???? Cái nút màu xanh dễ thương lắm mà 😭";
                break;
            case 8:
                setTemp(9);
                setPadding("px-28 py-32");
                infoRef.current.innerText =
                    "Xin đừng từ chối nữa mà, bạn đã click 9 lần rồi đoá 😔";
                break;
            case 9:
            case 10:
                setTemp(11);
                inforHeaderRef.current.innerText =
                    "Ok, mình ổn, mình ổn mà 😭, bạn xin lỗi mình đi :(((";
                setRefuse(true);
                setIsHide(true);
                stop();
                playRefuse();
                break;
        }

        if (countClick > 9) {
            setTemp(5);
        }
        // count.current++;
        // console.log(count.current);
    };

    const sayYes = () => {
        stop();
        playAccept();
        setTemp(10);
        setIsHide(true);
        inforHeaderRef.current.innerHTML = `Thế giới này có 4 mùa:<br/>
             Thứ 👆 là mùa Xuân,<br/>
             Thứ ✌️ là mùa hạ,<br/>
             Thứ 👌 là mùa thu,<br/>
             Còn thứ 4️⃣ này bạn rảnh chứ??`;
    };
    return (
        <>
            <div className="flex justify-center items-center bg-[#fef2f3] w-full h-dvh flex-col gap-4 px-4 relative px">
                <img src={ARR_PIC[temp]} alt="" width={300} height={300} />
                <h3
                    ref={inforHeaderRef}
                    className={cn(
                        "text-3xl font-bold text-[#F27A8A]",
                        refuse && "text-[#6b7280]"
                    )}
                >
                    Will you "Uống cafe" with me?
                </h3>
                <div className="flex gap-4 text-xl font-semibold">
                    <button
                        ref={yesRef}
                        onClick={() => sayYes()}
                        className={cn(
                            isHide && "hidden",
                            "bg-[#4ADE80] px-4 py-6 rounded-md hover:bg-[#22c55ee6]",
                            padding
                        )}
                    >
                        Chắc chắn nè
                    </button>
                    <div>
                        <button
                            ref={noRef}
                            onClick={() => sayNo()}
                            className={cn(
                                isHide && "hidden",
                                "bg-[#d5294d] px-4 py-6 rounded-md hover:bg-[#b31d3fe6]"
                            )}
                        >
                            Hẹn kiếp sau :))
                        </button>
                    </div>
                </div>
                <p
                    ref={infoRef}
                    className={cn(
                        !countClick && "hidden",
                        "mt-4 text-orange-600",
                        isHide && "hidden"
                    )}
                >
                    Bạn đã click Hẹn kiếp sau được <span>{countClick}</span> lần
                    rồi đó
                </p>
                <div
                    onClick={() => playOpen()}
                    className="w-16 h-16 rounded-full bg-red-400 absolute bottom-10 left-10 flex justify-center items-center hover:cursor-pointer"
                >
                    <AiFillSound className="w-14 h-14" />
                </div>
            </div>
        </>
    );
}

export default App;
