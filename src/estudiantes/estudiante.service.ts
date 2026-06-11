import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async findAll(): Promise<Estudiante[]> {
    return this.estudianteRepository.find();
  }

  async create(nombre: string, codigo: string): Promise<Estudiante> {
    const estudiante = this.estudianteRepository.create({ nombre, codigo });
    return this.estudianteRepository.save(estudiante);
  }
}
