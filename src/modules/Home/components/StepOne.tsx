function StepOne() {
  return (
    <div className="w-full">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold py-3">Talleres disponibles del 16 de Septiembre</h1>
      </div>
      <select
        className="w-full h-10 border border-gray-300 rounded-md px-2"
        name="workshop"
        id="workshop"
      >
        <option value="1">Taller de React</option>
        <option value="2">Taller de Vue</option>
        <option value="3">Taller de Angular</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div>
          <h2 className="font-medium text-lg">Descripción del taller</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, inventore fugiat possimus quisquam voluptate fuga fugit ex dignissimos quidem quo molestias eius eveniet hic quae? Atque cupiditate deleniti quisquam dicta? Sit a omnis aliquam necessitatibus repudiandae nemo illum accusamus voluptatibus, perferendis placeat cumque quod numquam architecto pariatur consectetur impedit dignissimos praesentium. Dicta modi placeat sequi vitae id, odio ipsam impedit, officia porro nulla dignissimos atque perferendis? Consectetur, necessitatibus culpa labore nihil accusantium numquam adipisci odit aut inventore aliquid facilis quasi repellendus? Id quaerat ipsam nemo dolores labore, in ullam laudantium ut fugiat, ab est adipisci eveniet consequuntur temporibus beatae officia?
          </p>
        </div>

        <div>
          <h2 className="font-medium text-lg">Tallerista</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et incidunt excepturi eligendi, accusantium dignissimos maiores iure quod facere ipsa est quisquam ab tempore facilis laboriosam laudantium nostrum quam at, a illo ducimus fugiat! Eius, excepturi! Porro asperiores aut molestias vel vero quod reiciendis non blanditiis ipsam quasi nihil a aspernatur, consequatur perferendis itaque quo illo, sequi excepturi dolorum nisi? Alias et odio ea incidunt quas itaque veniam, quam, consequuntur, molestias atque voluptas accusantium nisi sed quo laboriosam cupiditate. Quam, corporis quasi, deserunt pariatur magnam quidem dignissimos, porro qui fugit inventore at. Nostrum similique itaque nihil sequi laborum necessitatibus porro illo.
          </p>
        </div>
      </div>
    </div>
  )
}

export { StepOne }
