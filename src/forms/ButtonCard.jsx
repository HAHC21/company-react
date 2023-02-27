export default function ButtonCard(props) {
    return (
        <div className='input-button'>
            <input
                type="button"
                id={props.id}
                value={props.value}
                onClick={props.onclick}
            />
        </div>
    )
}