const daysOfTheWeak = {
    "Sun": "Niedziela",
    "Mon": "Poniedziałek",
    "Tue": "Wtorek",
    "Wed": "Środa",
    "Thu": "Czwartek",
    "Fri": "Piątek",
    "Sat": "Sobota"
}

export const formatDate = (date) => {
    let dateToDate = new Date(date);
    let day = dateToDate.getDate().toString();
    let month = dateToDate.getMonth() + 1;
    let year = dateToDate.getFullYear();
    let hours = dateToDate.getHours().toString();
    let minutes = dateToDate.getMinutes().toString();
    let dayOfWeek = date.slice(0, 3);

    return `${daysOfTheWeak[dayOfWeek]} ${day.length === 1 ? "0" + day : day}.${month.toString().length === 1 ? "0" + month : month}.${year} ${hours.length === 1 ? "0" + hours : hours}:${minutes.length === 1 ? "0" + minutes : minutes}`;
}