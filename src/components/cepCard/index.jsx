import './index.css'
export function Cepcard({data}) {
    return (
        <div className='containerCep'>
            <h1>{data.localidade.toUpperCase()}</h1>
            <div className="info">
                <div className='infoCep'>
                    <img src={data.image} alt="Foto da cidade" />
                    <li>cep: {data.cep}</li>
                    <li>localidade: {data.localidade}</li>
                    <li>logradouro: {data.logradouro}</li>
                    <li>bairro: {data.bairro}</li>
                    <li>DDD: {data.ddd}</li>
                </div>
                <div>
                    <p className='description'>{data.description}</p>
                </div>
            </div>
        </div>
    )
}