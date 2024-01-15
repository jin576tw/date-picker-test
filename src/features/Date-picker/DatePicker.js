
import './DatePicker.scss'
import DatePickerHeader from "./components/DatePickerHeader/DatePickerHeader"
import DatePickerContent from "./components/DatePickerContent/DatePickerContent"
import { useEffect, useState } from 'react'
import { add, eachDayOfInterval, endOfMonth, isBefore, isEqual, startOfMonth, sub } from 'date-fns'

const DatePicker = () => {

    // 當前年份
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    // 當前月份
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)

    // 挑選的起始日期
    const [pickFirstDate, setPickFirstDate] = useState(null)

    // 挑選的結束日期
    const [pickEndDate, setPickEndDate] = useState(null)

    // 挑選的日期範圍
    const [pickedDates, setPickedDates] = useState([])

    // 顯示當月份所有日子
    const [dates, setDates] = useState([])

    /**
     * 選取日期
     */
    const handlePickDate = (date) => {

        if (!pickFirstDate) {
            setPickFirstDate(date)
            setPickedDates((prev) => [...prev, date])

        } else {
            setPickEndDate(date)
        }


        // 判斷已選取
        const isPicked = pickedDates.some((pickedDate) => isEqual(pickedDate, date))


        // 檢核選擇日期大於起始日期重置
        if (isBefore(date, pickFirstDate) || isPicked) {
            setPickFirstDate(null)
            setPickEndDate(null)
            setPickedDates([])
        }

    }

    /**
     * 切換上個月份
     */
    const handlePrevMonth = () => {
        setCurrentMonth((currMonth) => currMonth - 1)
    }

    /**
     * 切換下個月份
     */
    const handleNextMonth = () => {
        setCurrentMonth((currMonth) => currMonth + 1)
    }

    useEffect(() => {

        // 建立當前年份和月份所有日期
        const formatDates = () => {
            const monthInterval = new Date(currentYear, currentMonth - 1);

            const startMonth = startOfMonth(monthInterval)
            const endMonth = endOfMonth(monthInterval);

            // 計算顯示起始、結束日期
            const startDate = sub(startMonth, { days: startMonth.getDay() });
            const endDate = add(endMonth, { days: 6 - endMonth.getDay() });

            return eachDayOfInterval({ start: startDate, end: endDate })
        }

        setDates(formatDates())

        if (currentMonth === 0) {
            setCurrentYear((currYear) => currYear - 1)
            setCurrentMonth(12)
        }

        if (currentMonth === 13) {
            setCurrentYear((currYear) => currYear + 1)
            setCurrentMonth(1)
        }

        // 建立挑選日期範圍內容
        if (pickFirstDate && pickEndDate) {
            setPickedDates(eachDayOfInterval({ start: pickFirstDate, end: pickEndDate }))
        }

    }, [currentYear, currentMonth, pickFirstDate, pickEndDate])

    return (
        <div className="date-picker-component">
            <div className="date-picker-container">
                <DatePickerHeader
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />
                <DatePickerContent
                    dates={dates}
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    pickedDates={pickedDates}
                    onPickDate={handlePickDate} />
            </div>
        </div>
    )
}

export default DatePicker
