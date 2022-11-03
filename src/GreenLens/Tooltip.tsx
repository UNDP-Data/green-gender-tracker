import styled from 'styled-components';
import { CountryGreenLenseSummaryDataType } from '../Types';

interface Props {
  data: CountryGreenLenseSummaryDataType;
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
  z-index: 1000;
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 24rem;
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
      <h4 className='margin-bottom-07 undp-typography'>{data.countryName}</h4>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of policies
        </div>
        <div className='bold'>
          {data.noOfPolicies}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of gender-sensitive policies
        </div>
        <div className='bold'>
          {data.noOfGenderPolicies}
        </div>
      </div>
      <div className='flex-div flex-space-between margin-bottom-05'>
        <div>
          No. of policies positive for environment
        </div>
        <div className='bold'>
          {data.noOfPoliciesPositiveForEnvironment}
        </div>
      </div>
      <div className='flex-div flex-space-between'>
        <div>
          No. of policies with gender-green nexus
        </div>
        <div className='bold'>
          {data.noOfPoliciesGenderGreenNexus}
        </div>
      </div>
    </TooltipEl>
  );
};
