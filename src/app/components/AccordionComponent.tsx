'use client';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';

interface IAccordionComponentProps {
  titles: string[];
  contents: string[];
}

const AccordionComponent = ({ titles, contents }: IAccordionComponentProps) => {
  return (
    <Accordion allowToggle width={{ base: '100%', xl: '50%' }}>
      {titles.map((title, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box
                color={'gray.700'}
                fontWeight={'bold'}
                fontSize={'lg'}
                flex='1'
                textAlign='left'
              >
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel color={'gray.500'} pb={4} lineHeight={1.7}>
            {contents[index]}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionComponent;
