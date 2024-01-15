import './DateButton.scss'

const DateButton = (props) => {

    const handlePick = () => {
        props.onPick(props.date)
    }

    return (
        <button
            type='button'
            className={`date-button ${props.today ? 'is-today' : ''} ${props.picked ? 'is-picked' : ''}`}
            disabled={props.disabled}
            onClick={handlePick}>
            {props.date.getDate()}日
        </button >
    )

}

export default DateButton 