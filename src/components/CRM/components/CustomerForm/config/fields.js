export const groups = ['EMBA-12', 'MBA-23', 'EMBA-25', 'EMBA-24'];

export const fields = {
    personName: { name: "personName", initialState: '', label: "ФИО", placeholder: "Введите ФИО", type: "text", size: 20, smallWindowSize: 20},
    group: {name: 'group', initialState: groups, content: groups},
    tel:   { name: "tel", initialState: '', label: "Телефон", placeholder: "Введите телефон", type: "number", size: 10, smallWindowSize: 20 },
    email: { name: "email", initialState: '', label: "Email", placeholder: "Введите email", type: "email", size: 10, smallWindowSize: 20 },
    industry: { name: "industry", initialState: '', label: "Индустрия", placeholder: "Введите индустрию", type: "text", size: 10, smallWindowSize: 24 },
    company: { name: "company", initialState: '', label: "Компания", placeholder: "Введите компанию", type: "text", size: 12, smallWindowSize: 24 },
    city: { name: "city", initialState: '', label: "Город", placeholder: "Введите город", type: "text",  size: 12, smallWindowSize: 24},
    position: { name: "position", initialState: '', label: "Должность", placeholder: "Введите должность", type: "text", size: 12, smallWindowSize: 24 },
}


const fieldsArray = [];
const fieldsObj = {}

for (let key in fields){
    fieldsArray.push(fields[key])
    fieldsObj[key] = fields[key].initialState
}


export { fieldsArray, fieldsObj }