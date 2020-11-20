import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Title,
  Block,
  BlockTitle,
  HR,
  CardsContainer,
  Card,
  CardTitle,
  CardCallout,
  FormContainer,
  ErrorAlert,
} from './styles';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import api from '../../services/api';

import simulationSchema from '../../schemas/simulationSchema';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

interface ICall {
  origin: string;
  destination: string;
  tariffPerMinute: number;
}

interface IPlan {
  slug: string;
  name: string;
  quota: number;
}

interface IGetCallsResponse {
  data: ICall[];
}

interface ISimulationResult {
  origin: number;
  destination: number;
  overageMinutes: number;
  price: number;
  priceWithPlan: number;
}

const Dashboard: React.FC = () => {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [callOrigins, setCallOrigins] = useState<string[]>([]);
  const [callDestinations, setCallDestinations] = useState<string[]>([]);
  const [simulation, setSimulation] = useState<ISimulationResult | null>(null);
  const [requestError, setRequestError] = useState(false);

  useEffect(() => {
    api.get('plans').then(({ data }) => setPlans(data));

    api.get('calls').then(({ data }: IGetCallsResponse) => {
      const origins = new Set(data.map(({ origin }) => origin));
      const destinations = new Set(data.map(({ destination }) => destination));

      setCallOrigins(Array.from(origins).sort());
      setCallDestinations(Array.from(destinations).sort());
    });
  }, []);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (formData: unknown) => {
    // flush unform errors
    formRef.current?.setErrors({});

    try {
      await simulationSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      formRef.current?.setErrors(getValidationErrors(error));

      return;
    }

    try {
      const { data } = await api.post('simulations', formData);

      setSimulation(data as ISimulationResult);
      setRequestError(false);
    } catch (error) {
      setSimulation(null);
      setRequestError(true);
    }
  }, []);

  return (
    <>
      <img src={logoImg} alt="VxTel Telefonia" />
      <Title>Planos FaleMais</Title>
      <Block>
        <p>
          Utilize sua franquia de minutos e pague apenas o excedente, com um
          acréscimo de 10% sobre a tarifa do minuto.
        </p>
        <p>Confira as opções abaixo:</p>
      </Block>

      <CardsContainer>
        {plans.map(({ slug, name, quota }) => (
          <Card key={slug}>
            <CardTitle>{name}</CardTitle>
            <CardCallout>
              <strong>{`${quota} minutos`}</strong>
            </CardCallout>
          </Card>
        ))}
      </CardsContainer>

      <HR />

      <Block>
        <BlockTitle>Faça uma simulação</BlockTitle>
        <p>
          Selecione o plano desejado, a origem e o destino. Em seguida, insira a
          duração em minutos e confirme para simular a chamada.
        </p>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Select name="planSlug">
              <option value="">Selecione um plano</option>
              {plans.map(({ slug, name }) => (
                <option key={slug} value={slug}>
                  {name}
                </option>
              ))}
            </Select>

            <Select name="origin">
              <option value="">Selecione uma origem</option>
              {callOrigins.map(origin => (
                <option key={`origin-${origin}`} value={origin}>
                  {origin}
                </option>
              ))}
            </Select>

            <Select name="destination">
              <option value="">Selecione um destino</option>
              {callDestinations.map(destination => (
                <option key={`destination-${destination}`} value={destination}>
                  {destination}
                </option>
              ))}
            </Select>

            <Input
              name="duration"
              type="number"
              min="0"
              placeholder="Insira a duração"
            />

            <Button type="submit">Simular</Button>
          </Form>
        </FormContainer>
      </Block>

      {requestError && !simulation && (
        <ErrorAlert>
          <p>
            <span role="img" aria-label="Erro">
              ❌
            </span>
            Oops! A simulação não pôde ser realizada.
            <br />
            Por favor, verifique o plano selecionado, a origem, o destino e
            tente novamente.
          </p>
        </ErrorAlert>
      )}

      {!requestError && simulation && (
        <>
          <Block>
            <BlockTitle>Resultado</BlockTitle>
            <p>
              {`Sua chamada de ${simulation.origin} para ${simulation.destination} `}
              {simulation.overageMinutes > 0
                ? `excede a franquia do plano em ${
                    simulation.overageMinutes
                  } minuto${simulation.overageMinutes > 1 ? 's' : ''}.`
                : 'é completamente coberta pelo plano.'}
            </p>
          </Block>

          <CardsContainer>
            <Card>
              <CardTitle>Sem plano</CardTitle>
              <CardCallout>
                <strong>{`$ ${simulation.price}`}</strong>
              </CardCallout>
            </Card>
            <Card>
              <CardTitle>Com FaleMais</CardTitle>
              <CardCallout>
                <strong>{`$ ${simulation.priceWithPlan}`}</strong>
              </CardCallout>
            </Card>
          </CardsContainer>
        </>
      )}
    </>
  );
};

export default Dashboard;
