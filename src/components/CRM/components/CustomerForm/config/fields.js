export const groups = ['EMBA-20', 'EMBA-18', 'EMBA-24', 'EMBA-21', 'MBA-5', 'EMBA-26', 'EMBA-19', 'EMBA-22', 'EMBA-25', 'MBA-8', 'EMBA-23', 'MBA-7', 'MBA-6'];

export const fields = {
    name: { name: "name", initialState: '', label: "ФИО", placeholder: "Введите ФИО", type: "text", size: 20, smallWindowSize: 20},
    group_name: {name: 'group_name', initialState: groups, content: groups},
    phone:   { name: "phone", initialState: '', label: "Телефон", placeholder: "Введите телефон", type: "number", size: 10, smallWindowSize: 20 },
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