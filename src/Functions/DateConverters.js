const convertDate1 = date => // ex. domingo 30 set.
    new Date(date)
        .toLocaleDateString("pt-PT", {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        }).replace(/,| de\b/g, '').replace(/(?<=\d\s\w{3})\w+/, '.');

const convertDate2 = date => // ex. 15 Abril 2023
    new Date(date)
        .toLocaleDateString("pt-PT", {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC'
        }).replace(/ de/g, '');

const convertDate3 = date => // ex. 15/05/2023
    new Date(date).toLocaleDateString("pt-PT");

const convertDate4 = date => // ex. 30 de abril
    new Date(date)
        .toLocaleDateString("pt-PT", {
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC'
        });

const convertDateToNumber = date =>  // ex. 2023-09-29T22:49:36.000Z ==> 20230929224936000
    Number(date.split(/[A-Z-:.]/).join(''));

export {convertDate1, convertDate2, convertDate3, convertDate4, convertDateToNumber};