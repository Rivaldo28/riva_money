package com.algamoney.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.algamoney.api.model.Lancamento;
import com.algamoney.api.repository.lancamento.LancamentoNoPageRepositoryQuery;

public interface LancamentoNoPageRepository extends JpaRepository<Lancamento, Long>, LancamentoNoPageRepositoryQuery{

}
