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
  z-index: 8;
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 35rem;
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
      <h5 className='margin-bottom-05 undp-typography bold'>{data.countryName}</h5>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          # Task forces
        </div>
        <div className='bold'>
          {data.noOfTF}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          # Task forces with women leads or co-leads
        </div>
        {
          data.noOfTFWithWomenLeader !== -1
            ? (
              <div className='bold'>
                {data.noOfTFWithWomenLeader}
                {' '}
                (
                {data.percentOfTFWithWomenLeader.toFixed(1)}
                %)
              </div>
            )
            : <div className='bold'>NA</div>
        }
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          # Task forces with gender parity or majority women members
        </div>
        {
          data.noOfTFWithMajorityWomenOfGenderParity !== -1
            ? (
              <div className='bold'>
                {data.noOfTFWithMajorityWomenOfGenderParity}
                {' '}
                (
                {data.percentOfTFWithMajorityWomenOfGenderParity.toFixed(1)}
                %)
              </div>
            )
            : <div className='bold'>NA</div>
        }
      </div>
      <hr />
      <div className='flex-div flex-space-between'>
        <div>
          Average share of women members in country task force(s)
        </div>
        {
          data.percentOfTFMembersWomen !== -1
            ? (
              <div className='bold'>
                {data.percentOfTFMembersWomen.toFixed(1)}
                %
              </div>
            )
            : <div className='bold'>NA</div>
        }
      </div>
    </TooltipEl>
  );
};
