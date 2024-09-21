import { Slider } from '@/modules/home/ui/pages/components/Slider'

function Home() {

  const images = [
    'https://jatic.mx/img/logo_jatic_2024_grande.png',
    'https://jatic.mx/img/logo_jatic_2024_grande.png',
    'https://jatic.mx/img/logo_jatic_2024_grande.png',
    'https://jatic.mx/img/logo_jatic_2024_grande.png',
  ]

  return (
    <div>
      <h1 className='flex justify-center items-center text-6xl text-slate-900 py-7'>Jatic 2024</h1>
      <Slider  images={images} />

      <p className='flex justify-center items-center text-2xl text-slate-900 p-5'>
        Elige tu taller
      </p>
      <select 
        name=""
        id=""
        className='w-full bg text p-2 rounded'
      >
        <option value="1">Taller 1</option>
        <option value="2">Taller 2</option>
        <option value="3">Taller 3</option>
        <option value="4">Taller 4</option>
        <option value="5">Taller 5</option>
        <option value="6">Taller 6</option>
        <option value="7">Taller 7</option>
        <option value="8">Taller 8</option>
        <option value="9">Taller 9</option>
        <option value="10">Taller 10</option>
      </select>
    </div>
  )
}

export { Home }