import axios from 'axios'

const API = 'https://simplecrmonline.cloud/api'


const config = async(token) => {
        let fields = {}
        const fieldsArray = [];
        const fieldsObj = {};
        const groupsName = {}
        const groupsId = {}

        const res = await axios.get(`${API}/groups`, { headers: {'X-CSRF-Token': token} })
        const groups = res.data.groups; 
        const defaultGroups = groups.map((field, i)=>i+1)
        fields = {
            name: { name: "name", initialState: '', label: "ФИО", placeholder: "Введите ФИО", type: "text", size: 20, smallWindowSize: 20},
            group_id: {name: 'group_id', initialState: groups, content: groups},
            phone:   { name: "phone", initialState: '', label: "Телефон", placeholder: "Введите телефон", type: "number", size: 10, smallWindowSize: 20 },
            email: { name: "email", initialState: '', label: "Email", placeholder: "Введите email", type: "email", size: 10, smallWindowSize: 20 },
            industry: { name: "industry", initialState: '', label: "Индустрия", placeholder: "Введите индустрию", type: "text", size: 10, smallWindowSize: 24 },
            company: { name: "company", initialState: '', label: "Компания", placeholder: "Введите компанию", type: "text", size: 12, smallWindowSize: 24 },
            city: { name: "city", initialState: '', label: "Город", placeholder: "Введите город", type: "text",  size: 12, smallWindowSize: 24},
            position: { name: "position", initialState: '', label: "Должность", placeholder: "Введите должность", type: "text", size: 12, smallWindowSize: 24 },
        }

        for (let key in fields){
            fieldsArray.push(fields[key])
            fieldsObj[key] = fields[key].initialState
        }


        for(let i=0; i< groups.length; i++){
            groupsName[groups[i].name] = groups[i].id
            groupsId[groups[i].id] = groups[i].name
        }


        return { groups, fields, fieldsArray, fieldsObj, groupsName, groupsId, defaultGroups }
}



export default config