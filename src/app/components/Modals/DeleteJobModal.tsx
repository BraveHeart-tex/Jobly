'use client';
import { toggleDeleteJobModal } from '@/app/redux/features/jobs';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import customFetch from '@/app/utils/customFetch';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Spinner,
  useColorMode,
  Tooltip,
  useToast,
  Box,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const DeleteJobModal = () => {
  const toast = useToast();
  const { colorMode } = useColorMode();

  const dispatch = useAppDispatch();
  const { isDeleteJobModalOpen, selectedJobId } = useAppSelector(
    (state) => state.jobsReducer
  );
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['job', selectedJobId],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${selectedJobId}`);
      return data.job;
    },
  });

  const { mutate: deleteJob, isLoading: isDeletingJob } = useMutation({
    mutationKey: ['deleteJob', selectedJobId],
    mutationFn: async () => {
      await customFetch.delete(`/jobs/${selectedJobId}`);
    },
    onSuccess: () => {
      toast({
        title: 'Job application deleted',
        description: 'Your job application has been deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      queryClient.invalidateQueries('fetchJobs');
      dispatch(toggleDeleteJobModal(null));
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'An error has occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      console.log(error);
    },
  });

  return (
    <Modal
      isOpen={isDeleteJobModalOpen}
      onClose={() => dispatch(toggleDeleteJobModal(null))}
      isCentered
      size={{
        base: 'md',
        lg: 'xl',
      }}
    >
      <ModalOverlay />
      <ModalContent>
        {isLoading ? (
          <Box
            height={'12rem'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Spinner color='facebook.500' />
          </Box>
        ) : (
          <>
            <ModalHeader
              color={colorMode === 'light' ? 'facebook.500' : 'gray.200'}
            >
              Delete Job Application for:
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text
                fontWeight={'500'}
                fontSize={'xl'}
                color={colorMode === 'light' ? 'facebook.500' : 'gray.200'}
              >
                {data?.jobTitle} position at {data?.companyName}
              </Text>
              <Text
                color={colorMode === 'light' ? 'gray.500' : 'gray.300'}
                mt={2}
              >
                Are you sure you want to delete this job application?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Tooltip
                hasArrow
                bg={'red.600'}
                label='This action cannot be undone'
                aria-label='This action cannot be undone'
              >
                <Button
                  colorScheme='red'
                  mx={2}
                  onClick={() => deleteJob()}
                  isLoading={isDeletingJob}
                  isDisabled={isDeletingJob}
                >
                  Delete
                </Button>
              </Tooltip>
              <Button
                variant={'outline'}
                mr={3}
                onClick={() => dispatch(toggleDeleteJobModal(null))}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteJobModal;
