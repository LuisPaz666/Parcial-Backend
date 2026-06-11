import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { EstudianteService } from './estudiante.service';

@ApiTags('estudiantes')
@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear estudiante (solo admin)' })
  @ApiResponse({ status: 201, description: 'Estudiante creado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async create(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.create(dto.nombre, dto.codigo);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los estudiantes' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes' })
  async findAll() {
    return this.estudianteService.findAll();
  }
}
