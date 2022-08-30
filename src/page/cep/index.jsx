import { useState } from 'react'
import { Cepcard } from '../../components/cepCard'
import notFound from '../../assets/notfound.png'
import './index.css'

export function Cep() {
  const [cepInput, setCepInput] = useState()
  const [cepList, setcepList] = useState([])

  let id = 0
  const handleAddCep = async () => {
    const picture = `https://pt.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=`
    const description = `https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=`
    
    try {
      //GET CEP
      const viaCep = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`)
      const data = await viaCep.json()

      const city = encodeURI(data.localidade)
      
      //GET IMAGE
      const getPicture = await fetch(picture + city + "&origin=*")
      const image = await getPicture.json()
      const pageID01 = Object.keys(image.query.pages)
      const img = image.query.pages[pageID01]?.original?.source ?? notFound

      //GET DESCRIPTION
      const getDescription = await fetch(description + city + "&origin=*")
      const desc = await getDescription.json()
      const pageID02 = Object.keys(desc.query.pages)
      const getDesc = desc.query.pages[pageID02]?.extract ?? "Descrição Não encontrada"


      let cep = {
        cep: data.cep,
        localidade: data.localidade,
        logradouro: data.logradouro,
        bairro: data.bairro,
        ddd: data.ddd,
        image: img,
        description: getDesc.split(".")[0]
      }
      setcepList(prevState => [...prevState, cep])
    }
    catch {
      alert('CEP INVÁLIDO');
    }
  }

  return (
    <div className="container">
      <header>
        <h1>Busque algum Cep</h1>
        <div id="container">
          <input type="text" onChange={e => setCepInput(e.target.value)} name="cep" id="cep" placeholder='Cep...' />
          <button type="button" onClick={handleAddCep}>Buscar</button>
        </div>
      </header>
      {
        cepList.map(cep => <Cepcard key={id++} data={cep}/>)
      }
    </div>
  )
}