import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

const Dropdown = ({startingStatus, onDropdownChange}) => {

    const options = [
        {value: 0, color: "bg-green-300", text: "low"},
        {value: 1, color: "bg-yellow-300", text: "mid"},
        {value: 2, color: "bg-red-300", text: "high"},
    ]

    const [showing, setShowing] = useState(false);
    const [status, setStatus] = useState(0);

    const [color, setColor] = useState("bg-gray-300")
    const [text, setText] = useState("Idk")

    const resetDropdown = () => {
        options.map((option) => {
            if (option.value == status) {
                setColor(option.color)
                setText(option.text)
            }
        })
    }

    useEffect(() => {
        resetDropdown()
    }, [status])

    useEffect(() => {
        options.map((option) => {
            if (option.value == startingStatus) {
                setColor(option.color)
                setText(option.text)
            }
        })
    }, [])

    const openOptions = () => {
        setShowing(!showing)
    }

    return (
        <div className="">

            <h3 onClick={openOptions} className={color + " font-light px-5 py-1 rounded-xl w-32 text-center shadow  my-1 hover:my-0 hover:py-2 hover:cursor-pointer transition-all"}>
                {text}
            </h3>

            {showing == true &&
                <div className="absolute flex flex-col ">
                    {options.map((option) => {
                        
                        const changeStatus = () => {
                            setStatus(option.value)
                            setShowing(false)
                            onDropdownChange(option.value)
                        }

                        return (
                            <div onClick={changeStatus}>
                                <h3 className={option.color + " font-light px-5 py-1 rounded-xl w-32 text-center shadow my-1 hover:my-0 hover:py-2 hover:cursor-pointer transition-all"}>{option.text}</h3>
                            </div>
                        )
                    })}
                </div>
            }

        </div>
    )
}

export default Dropdown;