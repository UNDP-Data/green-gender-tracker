import styled from 'styled-components';
import { CountryTFSummaryDataType } from '../Types';

interface Props {
  data: CountryTFSummaryDataType;
  xPos: number;
  yPos: number;
}

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 10;
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 30rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

export const Tooltip = (props: Props) => {
  const {
    data,
    xPos,
    yPos,
  } = props;
  return (
    <TooltipEl className='tooltip' x={xPos} y={yPos} verticalAlignment={yPos > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={xPos > window.innerWidth / 2 ? 'left' : 'right'}>
      <h4 className='margin-bottom-07'>{data.countryName}</h4>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          # Task force
        </div>
        <div className='bold'>
          {data.noOfTF}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          # task force with women leader or co-chair
        </div>
        <div className='bold'>
          {data.noOfTFWithWomenLeader}
          {' '}
          (
          {data.percentOfTFWithWomenLeader.toFixed(1)}
          %)
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          # task force with gender parity or women majority
        </div>
        <div className='bold'>
          {data.noOfTFWithMajorityWomenOfGenderParity}
          {' '}
          (
          {data.percentOfTFWithMajorityWomenOfGenderParity.toFixed(1)}
          %)
        </div>
      </div>
      <hr />
      <div className='flex-div flex-space-between margin-bottom-05 margin-top-05'>
        <div>
          # members in task force
        </div>
        <div className='bold'>
          {data.noOfTFMembers ? data.noOfTFMembers : 'NA'}
        </div>
      </div>
      <div className='flex-div flex-space-between'>
        <div>
          # women members in task force
        </div>
        {
          data.noOfTFMembers
            ? (
              <div className='bold'>
                {data.noOfTFMembersWomen}
                {' '}
                (
                {data.percentOfTFMembersWomen.toFixed(1)}
                %)
              </div>
            )
            : <div className='bold'>NA</div>
        }
      </div>
    </TooltipEl>
  );
};
