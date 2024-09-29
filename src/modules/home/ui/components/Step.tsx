import { DateEntity } from '@/modules/date/domain/entity'

type StepProps = {
  date: DateEntity
}

function Step({
  date
}: StepProps) {
  return (
    <div>
      {date.id}
    </div>
  )
}

export { Step }