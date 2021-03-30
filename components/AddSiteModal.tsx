import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';
import sites from 'pages/api/sites';

type InputData = {
  name: string;
  url: string;
};

const AddSiteModal = (props: { isFirst?: boolean }) => {
  const { isFirst } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const toast = useToast();

  const { register, handleSubmit, watch, errors } = useForm<InputData>();
  const onSubmit = handleSubmit(({ name, url }) => {
    const newSite = {
      authorId: auth.user ? auth.user.uid : null,
      createdAt: new Date().toISOString(),
      name,
      url,
    };
    mutate(
      '/api/sites',
      async (sites: []) => {
        const res = await createSite(newSite);
        const id = res.id;
        const updatedSites = [...sites, { id, ...newSite }];

        return updatedSites;
      },
      false
    );

    toast({
      title: 'Success!',
      description: 'Website added succesfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  });

  return (
    <>
      <Button
        color={!isFirst ? 'whiteAlpha.900' : ''}
        backgroundColor={!isFirst ? 'blackAlpha.900' : ''}
        variant="solid"
        size="md"
        w="min"
        onClick={onOpen}
      >
        {isFirst ? 'Add Your First Site' : '+ Add Site'}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={onSubmit}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontWeight="600">Name</FormLabel>
              <Input
                id="site-input"
                ref={register({ required: true })}
                placeholder="My site"
                name="name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontWeight="600">Link</FormLabel>
              <Input
                ref={register({ required: true })}
                name="url"
                id="link-input"
                placeholder="https://website.com"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>

            <Button
              id="create-site-button"
              type="submit"
              backgroundColor="accent"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
