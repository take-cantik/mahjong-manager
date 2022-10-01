export interface InformationProps {
  key: string
  value: string
}

export const Information = ({ key, value }: InformationProps): JSX.Element => {
  return (
    <div>
      <p>{key}</p>
      <p>{value}</p>
    </div>
  )
}
