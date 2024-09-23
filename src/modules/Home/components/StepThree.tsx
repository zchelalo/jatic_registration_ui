function StepThree() {
  return (
    <div className="w-full">
      <div>
        <h1 className="flex justify-center items-center text-2xl sm:text-4xl font-bold py-3">Resumen</h1>
      </div> 
      <div>
        <h1 className="flex justify-center text-xl sm:text-2xl font-bold py-3">Talleres disponibles del 16 de Septiembre</h1>
      </div>
      <div className="grid place-items-start grid-cols-2 gap-4 py-4">
        <div>
          <h2 className="font-medium text-lg">Descripción del taller</h2>
          <p>
            aa
          </p>
        </div>
        <div>
          <h2 className="font-medium text-lg">Tallerista</h2>
          <p>
            a
          </p>
        </div>
      </div><div>
        <h1 className="flex justify-center text-xl sm:text-2xl font-bold py-3">Talleres disponibles del 17 de Septiembre</h1>
      </div>
      <div className="grid place-items-start grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div>
          <h2 className="font-medium text-lg">Descripción del taller</h2>
          <p>
            a
          </p>
        </div>
        <div>
          <h2 className="font-medium text-lg">Tallerista</h2>
          <p>
            a
          </p>
        </div>
      </div>
    </div>
  )
}

export { StepThree }