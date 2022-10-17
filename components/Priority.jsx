const Priority = ({ priority }) => {

    let color = "bg-gray-300";
    let text = "Idk";

    switch (priority) {
        case 0:
            color = "bg-green-300";
            text = 'Chill'
            break;
        case 1:
            color = "bg-yellow-300";
            text = 'Planned'
            break;
        case 2:
            color = "bg-red-300";
            text = 'Urgent'
            break;
        default:
            break;   
    }

    return (
        <h3 className={color + " font-light px-5 py-1 rounded-xl w-32 text-center shadow"}>{text}</h3>
    )
}

export default Priority;