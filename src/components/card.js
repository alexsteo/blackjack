
export const Card = ({suit, number}) => {
    const chooseCardImage = () => {
        return require(`../res/cards/${number + suit}.png`);
    }
    return (<img style={{height: '70px', width: '50px'}} src={chooseCardImage()}/>)
}
