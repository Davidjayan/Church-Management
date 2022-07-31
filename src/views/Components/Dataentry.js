
import { useEffect, useState } from 'react'
import { url } from '../Constants'
import { DataEntryForms } from './DataEntryForm'


const Dataentry = (props) => {
  const {setLoading} = props;
  const [familyheads, setFamilyheads] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });
  const [validity, setValidity] = useState(true);
  const [age, setAge] = useState();


  const [data, setData] = useState({
    Name: '',
    DOB: new Date(),
    Gender: 'male',
    WeddingDate: '',
    EmailID: '',
    Mobile: '',
    Address: '',
    FamilyHead: '',
    FamilyID: '',
    SelfID: '',
    Android: false,
    Baptized: false,
    Married: false,
  })

  useEffect(() => {


    let yearDifference = 31536000000;
    setAge(String(parseInt((new Date().getTime() - new Date(data.DOB).getTime()) / yearDifference).toString().replace("-", "")));


  }, [data.DOB])



  const [validated, setValidated] = useState();

  const handleSubmit = (event) => {
    const form = event.currentTarget

    if (form.checkValidity() == false) {
      // event.preventDefault()

      event.stopPropagation()

    }
    else {
      setValidated(true);
    }
  }




  const addrecords = () => {
    if (validated) {
      setLoading(true);
      fetch(`${url}/member_details.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.Name,
          dob: data.DOB,
          age: age,
          gender: data.Gender,
          married: data.Married==false?0:data.Married,
          weddingdate: data.WeddingDate,
          emailid: data.EmailID,
          mobile: data.Mobile,
          address: data.Address,
          familyhead: data.FamilyHead,
          baptized: data.Baptized==false?0:data.Baptized,
          android: data.Android==false?0:data.Android,
          familyid: data.FamilyID,
          selfid: data.SelfID,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          setNotify({
            ...notify,
            isOpen: true,
            severity: result['status'] == 1 ? "success" : "error",
            message: String(result['message'])
          });
          setData({
            Name: '',
            DOB: new Date(),
            Gender: 'male',
            WeddingDate: '',
            EmailID: '',
            Mobile: '',
            Address: '',
            FamilyHead: '',
            FamilyID: '',
            SelfID: '',
            Android: false,
            Baptized: false,
            Married: false,
          });

        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      setNotify({
        ...notify,
        isOpen: true,
        message: "Input all required"
      })
    }
  }

  useEffect(() => {
    addrecords();
    setValidated(false);
  }, [validated])

  const searchfamilyhead = () => {
    setLoading(true);
    fetch(`${url}/searchfamilyhead.php`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        let filteredresult = [...new Set(result)]
        setFamilyheads(filteredresult)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  useEffect(() => {
    searchfamilyhead()
  }, [validated])

  return (
    <DataEntryForms
      familyheads={familyheads}
      data={data}
      notify={notify}
      setNotify={setNotify}
      setData={setData}
      validated={validated}
      handleSubmit={handleSubmit}
    />
  )
}

export default Dataentry
